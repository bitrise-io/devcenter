## Welcome to the Bitrise.io API

!!! warning "The API is work-in-progress"
    The API is work-in-progress, we'll add docs for new endpoints here as we progress,
    as well as we might change things a bit if required.

- Join the discussion at: [https://discuss.bitrise.io/t/bitrise-api-v0-1-work-in-progress/1554](https://discuss.bitrise.io/t/bitrise-api-v0-1-work-in-progress/1554).
  Follow it if you want to get notified about new endpoints and changes,
  we announce those there.
- If you want to request a new API feature / endpoint,
  please do it here: [http://discuss.bitrise.io/t/bitrise-public-api/37](http://discuss.bitrise.io/t/bitrise-public-api/37)


## API domain/host and versioning

The Bitrise API's host is: [https://api.bitrise.io/](https://api.bitrise.io/)

Every endpoint except the root one is versioned, and the version have to be included in the URL right after the host.

Example: [https://api.bitrise.io/v0.1/me](https://api.bitrise.io/v0.1/me) (requires authentication)

Right now we have only one version, `v0.1`.

There's no long term compatibility promise for `v0.1`, although we try to do our best to not to break anything unless we have to. Once we're happy with `v0.1` we'll "freeze" it as `v1.0`, for which we'll provide long term support.
