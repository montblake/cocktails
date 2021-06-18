alert('JavaScript connected');


$('#confirm-password').on('keyup', function () {
    console.log('Key!');
    const $confirm = $('#confirm-password');
    const $password = $('#password');
    const length = $confirm.val().length;
    while ($confirm.val() === $password.val().slice(0,length)) {
        if (the lengths are the same ie full password )
        then change





        console.log('Matching!')
    } else {
        console.log('Not matching')
    }
});
     