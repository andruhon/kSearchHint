#jQuery search suggestions

Check http://kopolo.ru/for-developers/ksearchhint/demo/index.php for usage example

##Basic usage
```html
<div class="hintable">
    <input type="text" id="search"/>
</div>
```
```javascript
kSearchHint({
    input: '#search',                       //This is css selector of hintable input
    url: '/url/to/send/post/with/request/', //This url should return JSON with suggestions for your search string
    textName: 'search'                      //Name of variable containing your string which will be send by POST
});
```

Check `defaults` definition in kSearchHint.js for all options