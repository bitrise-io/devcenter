# Bitrise DevCenter

**Feel free to edit any page & to send us a Pull Request!!**

Note: you can edit the pages on GitHub directly,
you don't even have to `git clone` the repository.
Just select the file on [GitHub](https://github.com/bitrise-io/devcenter)
and click the **pencil/edit** icon,
which will open the GitHub editor for the file.
[Example for this page](https://github.com/bitrise-io/devcenter/edit/master/README.md).

The deployed documentation can be found at [http://devcenter.bitrise.io](http://devcenter.bitrise.io), which is a statically generated site, based on this repository's `/_articles` directory. All links in the articles are relative to the `/_articles` directory!

If you don't want to edit the page on GitHub,
feel free to [contact us](https://www.bitrise.io/contact),
and we'll do the change for you!

## Category notes

- `tips-and-tricks` vs `tutorials` : `tutorials` have to include a complete guide as much as possible,
  e.g. steps to register the repository/app. `tips-and-tricks` is short, only describes the thing it
  wants to achieve. Later can be moved into `tutorial`, by adding more info.


## API docs - edit the `.gg` files!!

API responses and the whole `.md` files are auto-generated;
please edit the `.md.gg` template files instead of editing the `.md` directly!

To add a new endpoint documentation section:

- open the `_articles/api/vX.md.gg` template file
- add the endpoint section, following the other endpoints' doc structure
- add the example endpoint call to the `_scripts/gen_api_docs_gotgen_config.go` file (using the `api-demo`
  bitrise.io user to locate the right example URL, e.g. if it have to include a repo/build/... slug)
- use that in the _example response_ section of the endpoint (`{{ (var "/URL-PATH").HTTPMETHOD }}`)
- and finally, run: `bitrise run generate-api-docs` to generate the `.md` from the `.md.gg`
