$(() => {
  $('form').on('click', (e) => {
    e.preventDefault();
    // This will grab the user input
    let userInput = $('input[type="number"]').val();
    const button = $(e.target).val();

    if (userInput < 1) {
      userInput = 10;
    }

    console.log(typeof e.target);
    //Reset the ordered list if the burough buttton is clicked but ignore the NYPD response button
    if (button != 'NYPD Response') {
      $('ol').html(``);
    }

    $.ajax({
      url:
        'https://data.cityofnewyork.us/resource/erm2-nwe9.json?borough=' +
        button.toUpperCase(),
    }).then(
      (data) => {
        // This will print the number of complaints that are input
        var count = 0;
        for (let index = 0; index < data.length; index++) {
          if (data[index].agency == 'NYPD' && count < Number(userInput)) {
            count++;
            $('ol').append(`
          <li>
          <strong>Borough</strong><span id="borough">${
            data[index].borough
          }</span>
          <br>
          <strong>Descriptor</strong>:<span id="descriptor">${
            data[index].descriptor
          }</span>
          <br>
          <strong>Agency</strong>:<span id="agency">${data[index].agency}</span>
          <br>
          <div ><strong>Resolution description</strong>:<span><br><section>${
            data[index].resolution_description
          }</section></span></div>
          <input type="submit" value="NYPD Response" onclick="response(${count.toString()})" class="btn btn-warning" id="bit">
          </li>
          
          <hr>
          `);
          }
        }
      },
      () => {
        // Output a bad request
        console.log('Bad Request');
      }
    );
  });
});
// This function will animate the click of the NYPD response
function response(x) {
  var myNodelist = document.querySelectorAll('div');

  $(myNodelist[x]).animate(
    {
      height: 'toggle',
    },
    'slow'
  );
}
