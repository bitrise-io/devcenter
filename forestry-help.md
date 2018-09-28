---

---
---

---
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

### Images and links 

### Note, info, warning 

Forestry supports using snippets to quickly add shortcodes to your content. In our case, the snippets include all message boxes which are HTML codes inserted directly into the content, parsed when building the site. 

NOTE: You can only insert snippets from the WYSIWYG editor. 

1. Place the cursor where you wish to insert a message box. 
2. Open the Snippets menu on the bottom toolbar.
3. Select the type of message box you need. 
4. Enter the title of your message between the quotation marks after `title=.`
5. Enter the content of your message between the quotation marks after `content=`.

## Front matter and menus

In Forestry, the front matter of the articles determine their place in the menu. That means you can manipulate an article's location in the menu system by editing their front matter.

In the `Front matter` of Forestry, you can create new front matter templates. Create a  menu front matter template this way:

 1. Click `Add template` in the top right corner.
 2. Add a template name (for example, new-menu-item)
 3. Add a `Field Group` on the right. When its settings appear, enter `menu` as the label. The same will be entered automatically as the name.
 4. In the green box on the left, click the `>` sign.
 5. On the right, select `Field Group` again.
 6. Enter `new-menu-item` as the label. The same will be entered automatically as the name.
 7. In the green box on the left, click the `>` sign.
 8. On the right, select `Text field`.
 9. Enter `weight` as the label. The same will be entered automatically as the name.
10. Click `Create template`.

That's it, you are done! Alternatively, you can go to any article that has front matter applied to it, click `...` then click `Create template` - Forestry will create the same template, you just need to change the relevant labels AND names - the names won't be automatically updated with the labels in this case!

### Creating a new menu item

Creating a new menu item in Forestry is slightly complicated. Unfortunately, we have to directly edit a .yml files in the GitHub repository.

1. Go to https://github.com/bitrise-io/devcenter/.
2. Enter the data folder and open and edit `menus.yml`.
3. Under main, enter the title of your new menu item, its identifier and weight.

   Example:

       main:
       - title: New menu item
         identifier: new-menu-item
         weight: 14

   The weight specifies the menu item's position relative to the other menu items - enter any value you want, later you can easily change this in Forestry.
4. Add an article that has a front matter menu entry corresponding to the identifier of the menu item. It can be an empty dummy article. You can do this in Forestry by creating a new front matter template and applying that to a dummy article (see [Using a front matter template](forestry-help-menus-md#using-a-front-matter-template)) or in GitHub, manually.

   Example:

       title: Dummy article
       menu:
         new-menu-item: 
       	weight: 1
5. Go to Forestry and you should see your new menu item in the Menus section.

### Adding an article to an existing menu

Once you have an article ready, you want to place it in the menu system so that it is visible on DevCenter. The article has to be in one of the directories on the sidebar!

There are two options:

* adding the article to a menu in the `Menus` section  (recommended in most cases)
* giving the article a front matter template (recommended if you are creating a new main menu item)

#### Using the Menus section

1. Enter the `Menus` section.
2. Click the menu you wish to place the article in (for example, iOS Code Signing).
3. Click `Add link`.
4. Change it to `Internal`.
5. From the dropdown menu, select the article.
6. Enter its title as the name of the article.
7. Click `Done`.
8. Click `Save` in the top right corner.

#### Using a front matter template

1. Open the sidebar section where the article is located and click on the article.
2. Click the `...` sign on the top right corner.
3. Select `Change template`.
4. Choose the front matter template of the menu where you wish to place the article (for example, ios-code-signing).