hexo.extend.helper.register('page_title', function() {
  if(this.is_category()) {
    return 'Category::' + this.page.category
  } else if(this.is_tag()) {
    return 'Tag::' + this.page.tag
  } else if(this.is_archive()) {
    return 'Archives'
  } else if(!this.is_home()) { // == page, post
    return this.page.title
  } else {
    return ''
  }
});
