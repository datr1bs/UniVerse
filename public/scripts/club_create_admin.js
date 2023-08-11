document.querySelector('.club-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const clubName = document.querySelector('.club-name').value;
    const clubDescription = document.querySelector('#message').value;
    const clubCategory = document.querySelector('.category').value;
    const clubThumbnail = document.querySelector('.thumbnail').value;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/club_added');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            window.location.replace('/club_admin');
        } else {
            alert('An error occurred while creating the club');
        }
    };
    xhr.send(JSON.stringify({
                            name: clubName,
                            description: clubDescription,
                            thumbnail: clubThumbnail,
                            category: clubCategory
    }));
});