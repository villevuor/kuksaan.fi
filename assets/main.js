document.getElementById('link').addEventListener('keyup', function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    shortenLink();
  }
});

function shortenLink() {
  var result = document.getElementById('result');
  var label = document.getElementById('label');
  var target = document.getElementById('shortened');

  result.classList.remove('active');
  label.classList.remove('error');
  document.getElementById('shortened').innerHTML = 'Kopioi linkki';

  var eventId = getEventId(document.getElementById('link').value);

  if ( eventId === false ) {
    label.classList += ' error';
    return false;
  }

  target.href = 'https://kuksaan.fi/' + eventId;
  target.innerHTML = 'kuksaan.fi/' + eventId;

  setTimeout(function(){
    result.classList += ' active';
  }, 100);
}

function getEventId(link) {
  var isKuksaLink = /kuksa\.partio\.fi\/Kotisivut/i;

  if ( !isKuksaLink.test(link) ) {
    return false;
  }

  var getId = /Id=([0-9]*)/i;

  return link.match(getId)[1];
}

var clipboard = new Clipboard('#copypaste', {
  text: function() {
      return document.getElementById('shortened').getAttribute('href').replace('https://', '');
  }
});

clipboard.on('success', function(e) {
  document.getElementById('copypaste').innerHTML = 'Kopioitu!';
});
