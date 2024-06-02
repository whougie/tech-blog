const showPostElement = document.querySelector('.showPosts');
const showNoPostsElement = document.querySelector('.showNoPosts');
const showCreatePostElement = document.querySelector('.showCreatePost');
const submitPostButtonElement = document.querySelector('.submitPostButton');
const postRecordElements = document.querySelectorAll('.postRecord');
const userPostsElement = document.querySelector('#userPosts');


const createPostButtonElement = document.querySelector('.createPostButton');

//////
// Event Listeners
//////

createPostButtonElement.addEventListener('click', (event) => {
  if (event.target === createPostButtonElement ) {
    //Check to see if there are posts and hide the posts and statement
    if (showPostElement) {
      showPostElement.setAttribute("hidden","");
    }
    //Check to see if there are no posts and hide statement
    if (showNoPostsElement)
      showNoPostsElement.setAttribute("hidden","");
    
    //Reveal the create Post elements
    showCreatePostElement.removeAttribute("hidden");
  }
});

submitPostButtonElement.addEventListener('click', async (event) => {
  const postTitle = document.querySelector("#postTitle");
  const postContent = document.querySelector('#postContent');
  
  event.preventDefault();
  
  let response;
  try {
    response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title: postTitle.value, content: postContent.value }),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch(error) {
    alert('Failed to create a new post and there was an error caught');
  }
  
  if (!response || !response.ok) {
    alert('Failed to create a new post')
  } 
  
  location.reload();
});

postRecordElements.forEach( postRecordElement => {
  postRecordElement.addEventListener('click', async (event) => {

    // Hide the showing showPosts
    showPostElement.setAttribute("hidden","");
    
    // Load the post record and display title and content for edit
    let response;
    try {
      response = await fetch(`/api/posts/${postRecordElement.dataset.id}`);
    } catch(error) {
      alert('Failed to create a new post');
    }
    
    if (!response || !response.ok) {
      alert('Failed to create a new post')
    } 
    
    const post = await response.json(); 
    
    const divTag = document.createElement('div');
    divTag.setAttribute('class', 'mb-3 border-start border-bottom border-end');
    
    const divTitleTag = document.createElement('div');
    divTitleTag.setAttribute('class', 'row titleSection');
    
    const spanBlogTag = document.createElement('span');
    spanBlogTag.textContent = "Edit Blog Post";
    
    const formTag = document.createElement('form');
    formTag.setAttribute('id', 'postEditForm');
    formTag.setAttribute('data-postid', post.id); 
    
    const labelTitleTag = document.createElement('label');
    labelTitleTag.setAttribute('class', 'form-label');
    labelTitleTag.setAttribute('for', 'postEditTitle');
    labelTitleTag.textContent = "Title: "
    
    const inputTitleTag = document.createElement('input');
    inputTitleTag.setAttribute('class', 'form-control');
    inputTitleTag.setAttribute('type', 'text');
    inputTitleTag.setAttribute('id', 'postEditTitle');
    inputTitleTag.setAttribute('value', post.title);
    
    const labelContentTag = document.createElement('label');
    labelContentTag.setAttribute('class', 'form-label');
    labelContentTag.setAttribute('for', 'postEditContent');
    labelContentTag.textContent = "Content: "
    
    const textareaContentTag = document.createElement('textarea');
    textareaContentTag.setAttribute('class', 'form-control');
    textareaContentTag.setAttribute('type', 'text');
    textareaContentTag.setAttribute('id', 'postEditContent');
    textareaContentTag.textContent = post.content;
    
    const divAlignForButtons = document.createElement('div');
    divAlignForButtons.setAttribute('class', 'text-center')
    
    const submitButton = document.createElement('button');
    submitButton.setAttribute('class', 'btn btn-primary submitPostButton');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Submit';

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'btn btn-danger deletePostButton');
    deleteButton.textContent = 'Delete';
    
    divAlignForButtons.append(submitButton, deleteButton);
    formTag.append(labelTitleTag, inputTitleTag, labelContentTag, textareaContentTag, divAlignForButtons);
    divTitleTag.append(spanBlogTag, formTag);
    divTag.append(divTitleTag);
    userPostsElement.append(divTag);
    

  });
});

userPostsElement.addEventListener('click', async (event) => {

    // Collect edit info and submit when the 'Submit' button is clicked
  if (event.target.classList.contains('submitPostButton')) {
    event.preventDefault();

    const postEditTitle = document.querySelector("#postEditTitle");
    const postEditContent = document.querySelector('#postEditContent');
    const postEditForm = document.querySelector('#postEditForm');
    
    let response;
    try {
      response = await fetch(`/api/posts/${postEditForm.dataset.postid}`, {
        method: 'PUT',
        body: JSON.stringify({ title: postEditTitle.value, content: postEditContent.value}),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch(error) {
      console.log(error);
    }
    
    if (!response || !response.ok) {
      console.log(response)
    } 
    
     location.reload();
  }

  // Delete post entry once the button is clicked
  if (event.target.classList.contains('deletePostButton')) { 
    const postEditForm = document.querySelector('#postEditForm');

    try {
      response = await fetch(`/api/posts/${postEditForm.dataset.postid}`, {
        method: 'Delete'
      });
    } catch(error) {
      alert('Failed to delete the post');
    }
    
    if (!response || !response.ok) {
      alert('Failed to delete the post')
    } 
    
    location.reload();
  }
})
