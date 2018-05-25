[`GET /apps/{APP-SLUG}/bitrise.yml`: Download the bitrise.yml.](#get-appsapp-slugbitriseyml)

[`POST /apps/{APP-SLUG}/bitrise.yml`: Upload a new bitrise.yml.](#post-appsapp-slugbitriseyml)


### GET /apps/{APP-SLUG}/bitrise.yml

Download the bitrise.yml of your application.

#### Example `curl` request

```
curl -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/bitrise.yml'
```

#### Example response

```
app:
  envs:
  - BITRISE_PROJECT_PATH: sample-apps-osx-10-12.xcodeproj
    opts:
      is_expand: false
  - BITRISE_SCHEME: sample-apps-osx-10-12
    opts:
      is_expand: false
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
format_version: 1.3.1
trigger_map:
- push_branch: '*'
  workflow: primary
- pull_request_source_branch: '*'
  workflow: primary
workflows:
  deploy:
    steps:
    - activate-ssh-key@3.1.1:
        run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
    - git-clone@3.4.2: {}
    - script@1.1.3:
        title: Do anything with Script step
    - certificate-and-profile-installer@1.8.4: {}
    - xcode-test-mac:
        inputs:
        - project_path: $BITRISE_PROJECT_PATH
        - scheme: $BITRISE_SCHEME
    - xcode-archive-mac@1.4.0:
        inputs:
        - project_path: $BITRISE_PROJECT_PATH
        - scheme: $BITRISE_SCHEME
    - deploy-to-bitrise-io@1.2.9: {}
  primary:
    steps:
    - activate-ssh-key@3.1.1:
        run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
    - git-clone@3.4.2: {}
    - script@1.1.3:
        title: Do anything with Script step
    - certificate-and-profile-installer@1.8.4: {}
    - xcode-test-mac@1.1.0:
        inputs:
        - project_path: $BITRISE_PROJECT_PATH
        - scheme: $BITRISE_SCHEME
    - deploy-to-bitrise-io@1.2.9: {}

```

### POST /apps/{APP-SLUG}/bitrise.yml

Upload a new bitrise.yml for your application.

#### Example `curl` request

```
curl -X POST -H 'Authorization: token THE-ACCESS-TOKEN' 'https://api.bitrise.io/v0.1/apps/APP-SLUG/bitrise.yml' -d '{"app_config_datastore_yaml":"app:\n  envs:\n  - BITRISE_PROJECT_PATH: sample-apps-osx-10-12.xcodeproj\n    opts:\n      is_expand: false\n  - BITRISE_SCHEME: sample-apps-osx-10-12\n    opts:\n      is_expand: false\ndefault_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git\nformat_version: 1.3.1\ntrigger_map:\n- push_branch: '*'\n  workflow: primary\n- pull_request_source_branch: '*'\n  workflow: primary\nworkflows:\n  deploy:\n    steps:\n    - activate-ssh-key@3.1.1:\n        run_if: '{{getenv \"SSH_RSA_PRIVATE_KEY\" | ne \"\"}}'\n    - git-clone@3.4.2: {}\n    - script@1.1.3:\n        title: Do anything with Script step\n    - certificate-and-profile-installer@1.8.4: {}\n    - xcode-test-mac:\n        inputs:\n        - project_path: $BITRISE_PROJECT_PATH\n        - scheme: $BITRISE_SCHEME\n    - xcode-archive-mac@1.4.0:\n        inputs:\n        - project_path: $BITRISE_PROJECT_PATH\n        - scheme: $BITRISE_SCHEME\n    - deploy-to-bitrise-io@1.2.9: {}\n  primary:\n    steps:\n    - activate-ssh-key@3.1.1:\n        run_if: '{{getenv \"SSH_RSA_PRIVATE_KEY\" | ne \"\"}}'\n    - git-clone@3.4.2: {}\n    - script@1.1.3:\n        title: Do anything with Script step\n    - certificate-and-profile-installer@1.8.4: {}\n    - xcode-test-mac@1.1.0:\n        inputs:\n        - project_path: $BITRISE_PROJECT_PATH\n        - scheme: $BITRISE_SCHEME\n    - deploy-to-bitrise-io@1.2.9: {}\n"}'
```

#### Example response

```
{
  "app": {
    "envs": [
      {
        "BITRISE_PROJECT_PATH": "sample-apps-osx-10-12.xcodeproj",
        "opts": {
          "is_expand": false
        }
      },
      {
        "BITRISE_SCHEME": "sample-apps-osx-10-12",
        "opts": {
          "is_expand": false
        }
      }
    ]
  },
  "default_step_lib_source": "https://github.com/bitrise-io/bitrise-steplib.git",
  "format_version": "1.3.1",
  "trigger_map": [
    {
      "push_branch": "*",
      "workflow": "primary"
    },
    {
      "pull_request_source_branch": "*",
      "workflow": "primary"
    }
  ],
  "workflows": {
    "deploy": {
      "steps": [
        {
          "activate-ssh-key@3.1.1": {
            "run_if": "{{getenv \"SSH_RSA_PRIVATE_KEY\" | ne \"\"}}"
          }
        },
        {
          "git-clone@3.4.2": {}
        },
        {
          "script@1.1.3": {
            "title": "Do anything with Script step"
          }
        },
        {
          "certificate-and-profile-installer@1.8.4": {}
        },
        {
          "xcode-test-mac": {
            "inputs": [
              {
                "project_path": "$BITRISE_PROJECT_PATH"
              },
              {
                "scheme": "$BITRISE_SCHEME"
              }
            ]
          }
        },
        {
          "xcode-archive-mac@1.4.0": {
            "inputs": [
              {
                "project_path": "$BITRISE_PROJECT_PATH"
              },
              {
                "scheme": "$BITRISE_SCHEME"
              }
            ]
          }
        },
        {
          "deploy-to-bitrise-io@1.2.9": {}
        }
      ]
    },
    "primary": {
      "steps": [
        {
          "activate-ssh-key@3.1.1": {
            "run_if": "{{getenv \"SSH_RSA_PRIVATE_KEY\" | ne \"\"}}"
          }
        },
        {
          "git-clone@3.4.2": {}
        },
        {
          "script@1.1.3": {
            "title": "Do anything with Script step"
          }
        },
        {
          "certificate-and-profile-installer@1.8.4": {}
        },
        {
          "xcode-test-mac@1.1.0": {
            "inputs": [
              {
                "project_path": "$BITRISE_PROJECT_PATH"
              },
              {
                "scheme": "$BITRISE_SCHEME"
              }
            ]
          }
        },
        {
          "deploy-to-bitrise-io@1.2.9": {}
        }
      ]
    }
  }
}
```
