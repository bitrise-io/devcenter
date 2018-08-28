package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"

	"github.com/go-yaml/yaml"
)

var (
	apiAccessToken = ""
	apiHost        = "https://api.bitrise.io"
)

func httpErrorDescription(resp *http.Response) string {
	errStr := fmt.Sprintf("%#+v", resp)
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return errStr + fmt.Sprintf(" | Failed to read Body, error: %+v", err)
	}
	return errStr + " | Body: " + string(bodyBytes)
}

func recordResponse(httpMethod, apiURL, requestBody, responseType string) string {
	req, err := http.NewRequest(httpMethod, apiURL, bytes.NewBuffer([]byte(requestBody)))
	if err != nil {
		log.Fatalf("Failed to create request, error: %+v", err)
	}
	req.Header.Set("Authorization", "token "+apiAccessToken)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("Failed to send request, error: %+v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode < http.StatusOK || resp.StatusCode > http.StatusAccepted {
		log.Fatalf("Non success response: %+v", httpErrorDescription(resp))
	}

	respParsed := map[string]interface{}{}
	prettyBytes := []byte{}
	if responseType == "yml" {
		if err := yaml.NewDecoder(resp.Body).Decode(&respParsed); err != nil {
			log.Fatalf("Failed to YAML decode response, error: %+v | response: %+v", err, resp)
		}
		prettyBytes, err = yaml.Marshal(&respParsed)
		if err != nil {
			log.Fatalf("Failed to pretty (YAML) print response, error: %+v", err)
		}
	} else {
		if err := json.NewDecoder(resp.Body).Decode(&respParsed); err != nil {
			log.Fatalf("Failed to JSON decode response, error: %+v | response: %+v", err, resp)
		}
		prettyBytes, err = json.MarshalIndent(&respParsed, "", "  ")
		if err != nil {
			log.Fatalf("Failed to pretty (JSON) print response, error: %+v", err)
		}
	}

	return string(prettyBytes)
}

func getTemplateURL(realURL string) string {
	templateURL := realURL
	if strings.Contains(templateURL, "users/") {
		regEx, err := regexp.Compile("users/[a-z0-9]+")
		if err != nil {
			log.Fatal("User slug regex compilation failed")
		}
		templateURL = regEx.ReplaceAllString(templateURL, "users/USER-SLUG")
	}
	if strings.Contains(templateURL, "organizations/") {
		regEx, err := regexp.Compile("organizations/[a-z0-9]+")
		if err != nil {
			log.Fatal("Organization slug regex compilation failed")
		}
		templateURL = regEx.ReplaceAllString(templateURL, "organizations/USER-SLUG")
	}
	if strings.Contains(templateURL, "apps/") {
		regEx, err := regexp.Compile("apps/[a-z0-9]+")
		if err != nil {
			log.Fatal("App slug regex compilation failed")
		}
		templateURL = regEx.ReplaceAllString(templateURL, "apps/APP-SLUG")
	}
	if strings.Contains(templateURL, "builds/") {
		regEx, err := regexp.Compile("builds/[a-z0-9]+")
		if err != nil {
			log.Fatal("Build slug regex compilation failed")
		}
		templateURL = regEx.ReplaceAllString(templateURL, "builds/BUILD-SLUG")
	}
	if strings.Contains(templateURL, "artifacts/") {
		regEx, err := regexp.Compile("artifacts/[a-z0-9]+")
		if err != nil {
			log.Fatal("Artifact slug regex compilation failed")
		}
		templateURL = regEx.ReplaceAllString(templateURL, "artifacts/ARTIFACT-SLUG")
	}
	if strings.Contains(templateURL, "provisioning-profiles/") {
		regEx, err := regexp.Compile("provisioning-profiles/[A-Za-z0-9]+")
		if err != nil {
			log.Fatal("Provisioning profile slug regex compilation failed")
		}
		templateURL = regEx.ReplaceAllString(templateURL, "provisioning-profiles/PROVISIONING-PROFILE-SLUG")
	}
	if strings.Contains(templateURL, "build-certificates/") {
		regEx, err := regexp.Compile("build-certificates/[A-Za-z0-9]+")
		if err != nil {
			log.Fatal("Build certificates slug regex compilation failed")
		}
		templateURL = regEx.ReplaceAllString(templateURL, "build-certificates/BUILD-CERTIFICATE-SLUG")
	}
	return templateURL
}

func uploadBitriseYMLRequestBody() string {
	type Response struct {
		AppConfigDataStoreYAML string `json:"app_config_datastore_yaml"`
	}
	response := recordResponse("GET", apiHost+"/v0.1/apps/13533d589b89fb4b/bitrise.yml", "", "yml")
	respBytes, err := json.Marshal(Response{AppConfigDataStoreYAML: response})
	if err != nil {
		log.Fatal("Cannot fetch bitrise.yml for request body")
	}
	return string(respBytes)
}

// DelimiterModel ...
type DelimiterModel struct {
	Left  string `json:"left"`
	Right string `json:"right"`
}

// GGConfigModel ...
type GGConfigModel struct {
	// Inventory - e.g: ["v0.1/me"]["GET"] = response
	Inventory map[string]map[string]string `json:"inventory"`
	Delimiter DelimiterModel               `json:"delimiter"`
}

func main() {
	// inputs
	{
		apiAccessToken = os.Getenv("BITRISEIO_API_ACCESS_TOKEN")
		if apiAccessToken == "" {
			log.Fatalln("No BITRISEIO_API_ACCESS_TOKEN env var is specified!")
		}
		paramAPIHost := os.Getenv("BITRISEIO_API_HOST")
		if paramAPIHost != "" {
			apiHost = paramAPIHost
		}
	}

	ggConfInventory := GGConfigModel{
		Delimiter: DelimiterModel{
			Left:  "{{",
			Right: "}}",
		},
	}
	ggConfInventory.Inventory = map[string]map[string]string{}

	log.Println("=============================")
	for _, aReq := range []struct {
		HTTPMethod   string
		Path         string
		QueryParams  string
		RequestBody  string
		ResponseType string
		NoResponse   bool
	}{
		{HTTPMethod: "GET", Path: "/v0.1/me"},
		{HTTPMethod: "GET", Path: "/v0.1/users/8e82ac7601178f17"},
		{HTTPMethod: "GET", Path: "/v0.1/organizations"},
		{HTTPMethod: "GET", Path: "/v0.1/organizations/e1ec3dea540bcf21"},
		{HTTPMethod: "GET", Path: "/v0.1/apps", QueryParams: "?limit=2"},
		{HTTPMethod: "GET", Path: "/v0.1/apps", QueryParams: "?limit=2&sort_by=last_build_at"},
		{HTTPMethod: "GET", Path: "/v0.1/users/8e82ac7601178f17/apps", QueryParams: "?limit=2"},
		{HTTPMethod: "GET", Path: "/v0.1/organizations/e1ec3dea540bcf21/apps", QueryParams: "?limit=2"},
		{
			HTTPMethod:  "POST",
			Path:        "/v0.1/apps/register",
			RequestBody: `{"provider":"github","is_public":false,"repo_url":"git@github.com:api_demo/example-repository.git","type":"git","git_repo_slug":"example-repository","git_owner":"api_demo"}`,
			NoResponse:  true,
		},
		{
			HTTPMethod:  "POST",
			Path:        "/v0.1/apps/022d8a3124f1225d/register-ssh-key",
			RequestBody: `{"auth_ssh_private_key":"your-private-ssh-key","auth_ssh_public_key":"your-public-ssh-key","is_register_key_into_provider_service":false}`,
			NoResponse:  true,
		},
		{
			HTTPMethod: "POST",
			Path:       "/v0.1/apps/022d8a3124f1225d/register-webhook",
			NoResponse: true,
		},
		{
			HTTPMethod:  "POST",
			Path:        "/v0.1/apps/022d8a3124f1225d/finish",
			RequestBody: `{"project_type":"ios","stack_id":"osx-vs4mac-stable","config":"default-ios-config","mode":"manual","envs":{"env1":"val1","env2":"val2"},"organization_slug":"e1ec3dea540bcf21"}`,
			NoResponse:  true,
		},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/13533d589b89fb4b/bitrise.yml", ResponseType: "yml"},
		{HTTPMethod: "POST", Path: "/v0.1/apps/13533d589b89fb4b/bitrise.yml", RequestBody: uploadBitriseYMLRequestBody()},
		{
			HTTPMethod:  "POST",
			Path:        "/v0.1/apps/518e869d56f2adfd/provisioning-profiles",
			RequestBody: `{"upload_file_name":"sample.provisionprofile","upload_file_size":2047}`,
			NoResponse:  true,
		},
		{HTTPMethod: "POST", Path: "/v0.1/apps/518e869d56f2adfd/provisioning-profiles/01C6FA6P6HRQT5PQ8RMMVVXE6W/uploaded", NoResponse: true},
		{HTTPMethod: "GET", Path: "/v0.1/apps/518e869d56f2adfd/provisioning-profiles", NoResponse: true},
		{HTTPMethod: "GET", Path: "/v0.1/apps/518e869d56f2adfd/provisioning-profiles/01C6FA6P6HRQT5PQ8RMMVVXE6W", NoResponse: true},
		{
			HTTPMethod:  "PATCH",
			Path:        "/v0.1/apps/518e869d56f2adfd/provisioning-profiles/01C6FA6P6HRQT5PQ8RMMVVXE6W",
			RequestBody: `{"is_protected":true}`,
			NoResponse:  true,
		},
		{
			HTTPMethod:  "POST",
			Path:        "/v0.1/apps/518e869d56f2adfd/build-certificates",
			RequestBody: `{"upload_file_name":"sample_cert.p12","upload_file_size":1023}`,
			NoResponse:  true,
		},
		{HTTPMethod: "POST", Path: "/v0.1/apps/518e869d56f2adfd/build-certificates/01C6FA2R4CB772QTDETBE0MENP/uploaded", NoResponse: true},
		{HTTPMethod: "GET", Path: "/v0.1/apps/518e869d56f2adfd/build-certificates", NoResponse: true},
		{HTTPMethod: "GET", Path: "/v0.1/apps/518e869d56f2adfd/build-certificates/01C6FA2R4CB772QTDETBE0MENP", NoResponse: true},
		{
			HTTPMethod:  "PATCH",
			Path:        "/v0.1/apps/518e869d56f2adfd/build-certificates/01C6FA2R4CB772QTDETBE0MENP",
			RequestBody: `{"is_protected":true}`,
			NoResponse:  true,
		},
		{
			HTTPMethod:  "POST",
			Path:        "/v0.1/apps/669403bffbe35909/builds",
			RequestBody: `{"hook_info":{"type":"bitrise"},"build_params":{"branch":"master","workflow_id":"primary"},"triggered_by":"bitrise_api_doc"}`,
		},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds", QueryParams: "?limit=3"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds", QueryParams: "?status=3"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds", QueryParams: "?branch=develop"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds", QueryParams: "?trigger_event_type=pull-request"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds", QueryParams: "?before=1493127294"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds", QueryParams: "?after=1497998102"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds", QueryParams: "?workflow=secondary"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds", QueryParams: "?commit_message=build%20will%20be%20aborted"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds", QueryParams: "?build_number=3"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds", QueryParams: "?sort_by=running_first"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds/3247e2920496e846"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds/3247e2920496e846/log"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds/3247e2920496e846/bitrise.yml", ResponseType: "yml"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds/9fb8eaaa4bdd3763/artifacts"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds/9fb8eaaa4bdd3763/artifacts/0d2277e50b8d32ce"},
		{HTTPMethod: "PATCH", Path: "/v0.1/apps/669403bffbe35909/builds/ddf4134555e833d8/artifacts/5a9f5da8d5f1057c", RequestBody: `{"is_public_page_enabled":true}`},
		{HTTPMethod: "DELETE", Path: "/v0.1/apps/669403bffbe35909/builds/ddf4134555e833d8/artifacts/5a9f5da8d5f1057c", NoResponse: true},
	} {
		fullURL := apiHost + aReq.Path + aReq.QueryParams
		log.Printf("=> %s %s (%s)", aReq.HTTPMethod, aReq.Path, fullURL)
		prettyResp := ""
		if !aReq.NoResponse {
			prettyResp = recordResponse(aReq.HTTPMethod, fullURL, aReq.RequestBody, aReq.ResponseType)
		}
		if _, found := ggConfInventory.Inventory[aReq.Path+aReq.QueryParams]; !found {
			ggConfInventory.Inventory[aReq.Path+aReq.QueryParams] = map[string]string{}
		}
		ggConfInventory.Inventory[aReq.Path+aReq.QueryParams][aReq.HTTPMethod] = prettyResp
		ggConfInventory.Inventory[aReq.Path+aReq.QueryParams][fmt.Sprintf("%s_cURL", aReq.HTTPMethod)] = getTemplateURL(fullURL)
		if aReq.RequestBody != "" {
			ggConfInventory.Inventory[aReq.Path+aReq.QueryParams][fmt.Sprintf("%s_RequestBody", aReq.HTTPMethod)] = aReq.RequestBody
		}
	}

	log.Println("=============================")

	ggConfJSON, err := json.MarshalIndent(ggConfInventory, "", "  ")
	if err != nil {
		log.Fatalf("Failed to marshal GG config, error: %+v", err)
	}
	fmt.Printf("%s\n", ggConfJSON)
	log.Println("=============================")

	const confFilePath = "./gg.conf.json"
	log.Println("Writing config into file ...")
	if err := ioutil.WriteFile(confFilePath, ggConfJSON, 0666); err != nil {
		log.Fatalf("Failed to write config into gg.conf.json file, error: %+v", err)
	}
	log.Println("Write DONE, path:", confFilePath)

}
