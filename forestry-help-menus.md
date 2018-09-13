---

---
### Creating a new menu item 

Creating a new menu item in Forestry is slightly complicated. Unfortunately, we have to directly edit a .yml files in the GitHub repository. 

1. Go to https://github.com/bitrise-io/devcenter/. 

1. Enter the data folder and open and edit `menus.yml`. 

1. Under main, enter the title of your new menu item, its identifier and weight. 

    Example:
 	```
    main:
    - title: Frequently Asked Questions (FAQ)
      identifier: faq
      weight: 14
    ```

    The weight specifies the menu item's position relative to the other menu items - enter any value you want, later you can easily change this in Forestry. 

1. Add an article that has a front matter menu entry corresponding to the identifier of the menu item. It can be an empty dummy article. 

	Example: 
    ```
    	

1. Go to Forestry and you should see your new menu item in the Menus section. 