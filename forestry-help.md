---
sitemap:
  exclude: 'yes'
---
***

***

**IMPORTANT: This guide is intended to be used with the Forestry CMS**. Our external contributors who submit pull requests to the DevCenter repository do NOT need to follow this guide as it is not relevant for them!

***

### Creating new articles with Forestry

1. Go to the `For review` section of the sidebar.
2. Click `Add new` on the top of the screen.
3. Choose a Front Matter Template. In most cases, the **basic template** works perfectly.
4. Add some content to the editor on the right, and click `Save draft`.

You can come back and edit the article any time. Please remember that every time you click `Save`, Forestry pushes a commit to GitHub. You can view your file in the DevCenter repository.

**IMPORTANT:** Please make sure when your article is ready for review that a single commit on GitHub makes all changes visible. With a new article, that means you should:

1. Cut its entire content (keep it on the clipboard!) and then click `Save draft`
2. Once it is saved (the little circle is green), paste the content back in and click `Save draft`.

This way you will have a commit that will show the entire content of the article as new content. Voilá!

### Updating an existing article

1. Create a new article in the `For review` section.
2. Copy the contents of the existing article into the new article.
3. Add your changes.

**IMPORTANT:** Please make sure when your article is ready for review that a single commit on GitHub makes all changes visible. With an existing article this means you should make sure that all your changes are added with a single `Save`.

### Getting an article reviewed

1. Save the article on Forestry - this creates a commit on GitHub so only save on Forestry when your content is ready for review.
2. Go to the [commits page of the DevCenter repository](https://github.com/bitrise-io/devcenter/commits/master) and find the commit or commits created when you saved the article. Its commit message should be "Updated article-name.md" or "Created article-name.md".

NOTE: if you have several articles ready for review, you will find each article in a separate commit.

1. Select and copy the links of the commits in your browser's address bar and add them to the review task(s) in ClickUp.
2. Move your writing tasks to _Blocked_ status.

### Publishing an article

Once the review is done and the article is approved, we are ready to publish.

1. Copy the contents of the article in the `For review` section in to the article in its "proper" place. For example, if you edited the _Quick Start Guide to Bitrise_ article, copy the content from the article in the `For review` section to the article in the `Getting started` section.
2. If the `Draft` setting is `ON`, turn it off. Once it's off, click `Save`.

And done! Forestry will push your article into the repository and GitHub pages will build it.

### Note, info, warning

Forestry supports using snippets to quickly add shortcodes to your content. In our case, the snippets include all message boxes which are HTML codes inserted directly into the content, parsed when building the site.

NOTE: You can only insert snippets from the WYSIWYG editor.

1. Place the cursor where you wish to insert a message box.
2. Open the Snippets menu on the bottom toolbar.
3. Select the type of message box you need.
4. Enter the title of your message between the quotation marks after `title=.`
5. Enter the content of your message between the quotation marks after `content=`.

### Tips and tricks

#### The {% raw %} tag

Jekyll is built on the Liquid templating language and therefore tries to parse anything within double curly brackets {{ such as this }}. The result is the content within simply will not appear once the site is built.

The workaround is to use the {% raw %} tag to indicate to Jekyll that nothing within the tag needs to be parsed. Like this:

{% raw %}

Please, {{ Jekyll }}, just display everything, brackets and all here.

{% endraw %}

Of course, this works for any formatting that might be lost otherwise when the site is built.
