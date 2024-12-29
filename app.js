$(document).ready(function() {
    loadContacts();

    $('#contactForm').submit(function(e) {
        e.preventDefault();

        const name = $('#name').val();
        const email = $('#email').val();

        if (name && email) {
            const contact = {
                name: name,
                email: email
            };

            let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

            contacts.push(contact);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            loadContacts();

            $('#name').val('');
            $('#email').val('');
        } else {
            alert('Будь ласка, заповніть всі поля!');
        }
    });

    $('#contactList').on('click', '.delete', function() {
        const index = $(this).data('index');

        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

        contacts.splice(index, 1);

        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();
    });

    function loadContacts() {
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

        $('#contactList').empty();

        contacts.forEach((contact, index) => {
            const contactItem = `
                <li>
                    ${contact.name} - ${contact.email}
                    <button class="delete" data-index="${index}">Видалити</button>
                </li>
            `;
            $('#contactList').append(contactItem);
        });
    }
});
