const url = `${location.href}/data.json`;
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const btn = document.getElementById('subscribe');
const msg = document.querySelector('.coming__msg');

const getEmailVal = () => {
  const val = emailInput.value;
  return val;
};

const validateEmail = email => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validate = () => {
  const emailValue = getEmailVal();

  if (validateEmail(emailValue)) {
    console.log('Email is valid, continue with form submission');
    return true;
  } else {
    alert('Email is invalid, skip form submission');
    return false;
  }
};

const isEmail = (emails, email) => {
  return emails.includes(email);
};

const htmlTemplate = () => {
  const html = `<span class='coming__msg'>Please, provide a valid email</span>`;
  return html;
};

btn.addEventListener('click', async e => {
  e.preventDefault();

  if (validate() === false) {
    msg.textContent = 'Please, provide a valid email';
    return;
  }

  msg.textContent = '';
  const emailValue = getEmailVal();

  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    const emails = jsonData.emails;
    console.log(`Fetching correct: ${emails}`);

    const emailFound = isEmail(emails, emailValue);

    if (emailFound) {
      alert(
        `You are already subscribed!\nThank you for your interest. We're working on some exciting updates and can't wait to share them with you - stay tuned!`
      );
    } else {
      console.log('Nuevo email');
    }
  } catch (error) {
    console.error(`Fetching error: ${error.message}`);
  }
});
