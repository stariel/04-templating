'use strict';

let articleView = {};

// TODO: Where possible, refactor methods into arrow functions, including the document.ready() method at the bottom.

// COMMENT: How do arrow functions affect the context of "this"? How did you determine if a function could be refactored?
// In an arrow funciton 'this' lexical context is within it's containing block of code. But we want 'this' to be referring to the
// instance of the article object, so we cannot use arrow funcitons on the selector methods.

// articleView.populateFilters = () => {
//   let filterSource = $('#filter-template').html();
//   let filterTemplate = Handlebars.compile(filterSource);
//   let authorContext = {};
//   let categoryContext = {};

//   $('article').each(function() {
//     if (!$(this).hasClass('template')) {
//       let author = $(this).find('address a').text();
//       let category = $(this).attr('data-category');
//       //let optionTag = `<option value="${val}">${val}</option>`;

//       if (!authorContext.hasOwnProperty(author)) {
//         authorContext[author] = author;
//       }

//       if (!categoryContext.hasOwnProperty(category)) {
//         categoryContext[category] = category;
//       }
//     }
//   });
//   let authorHtml = filterTemplate(authorContext);
//   let categoryHtml = filterTemplate(categoryContext);
//   return [authorHtml, categoryHtml];
// };

articleView.handleAuthorFilter = () => {
  $('#author-filter').on('change', function(){
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = () => {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = () => {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $(`#${$(this).data('content')}`).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = () => {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

$(document).ready(() => {
  //articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})
