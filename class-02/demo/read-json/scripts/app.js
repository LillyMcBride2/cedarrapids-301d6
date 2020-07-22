'use strict';

$(() => {
  const ajaxSettings = { method: 'get', dataType: 'json' };
  $.ajax('./data/people.json', ajaxSettings)
    .then((data) => {
      const arrayOfPeople = data.results;
      arrayOfPeople.forEach((person) => {
        Person.all.push(new Person(person));
      });
    })
    .then(() => {
      renderPeople();
    });
});

function Person(person) {
  this.name = {
    first: person.name.first,
    last: person.name.last
  };
  this.image_url = person.picture.large;
  this.location = {
    city: person.location.city,
    state: person.location.state
  };
  this.getFullName = () => `${this.name.first} ${this.name.last}`;
}

Person.all = [];

Person.prototype.render = function () {
  let $template = $('.person-template').clone();
  $template.removeClass('person-template');
  $template.find('.fullName').text(this.getFullName);
  $template.find('.profileImage').attr('src', this.image_url);
  $template.find('.profileImage').attr('alt', this.getFullName);
  $template.find('.location').text(`${this.location.city}, ${this.location.state}`);
  return $template;
};

function renderPeople() {
  Person.all.forEach(person => $('#photo-gallery').append(person.render()));
  $('.person-template').remove();
}
