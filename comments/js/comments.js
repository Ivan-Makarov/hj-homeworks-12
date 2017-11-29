'use strict';

function showComments(list) {
    const commentsContainer = document.querySelector('.comments');
    list.forEach(item => {
        commentsContainer.appendChild(createComment(item))
    })
}

function createComment(comment) {
    const avatar = document.createElement('div');
    avatar.className = "avatar";
    avatar.style.backgroundImage = `url('${comment.author.pic}')`;

    const photo = document.createElement('div');
    photo.className = 'photo';
    photo.title = comment.author.name;
    photo.appendChild(avatar);

    const commentTextContent = document.createElement('pre');
    commentTextContent.textContent = comment.text;

    const commentText = document.createElement('div');
    commentText.className = 'comment-text';
    commentText.appendChild(commentTextContent);

    const commentDate = document.createElement('div');
    commentDate.className = 'comment-date';
    commentDate.textContent = new Date(comment.date).toLocaleString('ru-Ru');

    const complain = document.createElement('li');
    commentDate.className = 'complain';

    const reply = document.createElement('li');
    commentDate.className = 'reply';

    const commentActions = document.createElement('ul');
    commentDate.className = 'comment-actions';
    commentActions.appendChild(complain);
    commentActions.appendChild(reply);

    const bottomComment = document.createElement('div');
    bottomComment.className = 'bottom-comment';
    bottomComment.appendChild(commentDate);
    bottomComment.appendChild(commentActions);

    const commentBlock = document.createElement('div');
    commentBlock.className = 'comment-block';
    commentBlock.appendChild(commentText);
    commentBlock.appendChild(bottomComment);

    const commentWrap = document.createElement('div');
    commentWrap.className = "comment-wrap";
    commentWrap.appendChild(photo);
    commentWrap.appendChild(commentBlock)

    return commentWrap
}

fetch('https://neto-api.herokuapp.com/comments')
    .then(res => res.json())
    .then(showComments);
