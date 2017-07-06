package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
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

func recordResponse(httpMethod, apiURL string) string {
	req, err := http.NewRequest(httpMethod, apiURL, nil)
	if err != nil {
		log.Fatalf("Failed to create request, error: %+v", err)
	}
	req.Header.Set("Authorization", "token "+apiAccessToken)

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
	if err := json.NewDecoder(resp.Body).Decode(&respParsed); err != nil {
		log.Fatalf("Failed to JSON decode response, error: %+v | response: %+v", err, resp)
	}

	prettyBytes, err := json.MarshalIndent(&respParsed, "", "  ")
	if err != nil {
		log.Fatalf("Failed to pretty (JSON) print response, error: %+v", err)
	}

	return string(prettyBytes)
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
		HTTPMethod  string
		Path        string
		QueryParams string
	}{
		{HTTPMethod: "GET", Path: "/v0.1/me"},
		{HTTPMethod: "GET", Path: "/v0.1/me/apps", QueryParams: "?limit=2"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds", QueryParams: "?limit=3"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds/3247e2920496e846"},
		{HTTPMethod: "GET", Path: "/v0.1/apps/669403bffbe35909/builds/3247e2920496e846/log"},
	} {
		fullURL := apiHost + aReq.Path + aReq.QueryParams
		log.Printf("=> %s %s (%s)", aReq.HTTPMethod, aReq.Path, fullURL)
		prettyResp := recordResponse(aReq.HTTPMethod, fullURL)
		ggConfInventory.Inventory[aReq.Path] = map[string]string{}
		ggConfInventory.Inventory[aReq.Path][aReq.HTTPMethod] = prettyResp
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
