const showAllPostsElements = $('.showAllPosts');
const allCommentsElements = $('.allComments');
const commentFormElement = $('.commentForm');
const submitCommentButtonElement = $('.submitCommentButton');
const postCommentElement = $('#postComment');

const divCommentsContainerElement = $(`<div class="mb-3 allCommentsForPost">`);


////////
// Listeners declarations
////////

// Listen on the Posts to see which one gets selected/clicked on
if (showAllPostsElements) {
  let postId;
  
  showAllPostsElements.on('click', async (event) => {
    if ( $(event.target).data('postid')) {// find the post id to select
      postId = $(event.target).data('postid');
    }
    
    if ($(event.target).closest('[data-postid]')) {
      parentWithPostId = $(event.target).closest('[data-postid]');
      postId = parentWithPostId.data('postid');
    } 

    // Adding postId to the submit button for easy access to the post id
    submitCommentButtonElement.attr('data-singlepostid', postId);
    
    // Generate the selected post and display 
    let comments = await fetch(`/api/comments`)
    .then( response => response.json());
    comments = comments.payload;
    const commentsForPost = comments.filter( comment => {
      if (comment.post_id === postId)
        return true
      else return false
    })
        
    //Hide the other Posts, but the selected one
    showAllPostsElements.each( function(index) {
      if ($(this).data('postid') !== postId) {
        $(this).attr("hidden","");
      } 
    })
    
    // Generate the comments for the post    
    commentsForPost.forEach( comment => {

      const divRowElement = $(`<div class="row my-3 titleSection ">`);
      const pCommentElement = $(`<p>${comment.content}</p>`);
      const pUserInfoElement = $(`<p>Posted by: ${comment.user.username} on ${comment.createdAt} </p>`);
      
      divRowElement.append(pCommentElement);
      divRowElement.append(pUserInfoElement);
      divCommentsContainerElement.append(divRowElement);
    });

    allCommentsElements.append(divCommentsContainerElement);

    // If commentForm is on the page then unhide
    if (commentFormElement)
      commentFormElement.removeAttr('hidden');

  })
}


// Listen to the submitCommentButton if it exists
submitCommentButtonElement.on('click', async (event) => {
  event.preventDefault();

  const content = $('#postComment');

  // Submit the add comment when the submitCommentButton is pressed
  const createResult = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ content: content.val(), post_id: submitCommentButtonElement.data('singlepostid') }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then (response => response.json());
  
  const comment = await fetch(`/api/comments/${createResult.payload.id}`)
  .then( response => response.json());

  // Append the new comment to the Blog
  const divRowElement = $(`<div class="row my-3 titleSection ">`);
  const pCommentElement = $(`<p>${comment.content}</p>`);
  const pUserInfoElement = $(`<p>Posted by: ${comment.user.username} on ${comment.createdAt} </p>`);
  
  divRowElement.append(pCommentElement);
  divRowElement.append(pUserInfoElement);
  divCommentsContainerElement.append(divRowElement);
  allCommentsElements.append(divCommentsContainerElement);

  // Clear the text from the comment new entry
  postCommentElement.val('');
})

