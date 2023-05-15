const url = `${location.href}/data.json`;
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const btn = document.getElementById('subscribe');
const msg = document.querySelector('.coming__msg');

const messages = {
  error: {
    class: 'coming__msg--error',
    text: `Please, provide a valid email address`,
  },
  success: {
    class: 'coming__msg--success',
    text: `Thank you! We'll be in your inbox soon.`,
  },
  info: {
    class: 'coming__msg--info',
    text: `You are already subscribed!\nThank you for your interest. We're working on some exciting updates and can't wait to share them with you - stay tuned!`,
  },
};

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
    return true;
  } else {
    return false;
  }
};

const isEmail = (emails, email) => {
  return emails.includes(email);
};

const cleanMsgClasses = () => {
  msg.classList.remove(
    messages.error.class,
    messages.success.class,
    messages.info.class
  );
};

btn.addEventListener('click', async e => {
  e.preventDefault();

  if (validate() === false) {
    msg.textContent = messages.error.text;
    cleanMsgClasses();
    msg.classList.add(messages.error.class);
    return;
  }

  msg.textContent = '';
  const emailValue = getEmailVal();

  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    const emails = jsonData.emails;

    const emailFound = isEmail(emails, emailValue);

    if (emailFound) {
      msg.textContent = messages.info.text;
      cleanMsgClasses();
      msg.classList.add(messages.info.class);
    } else {
      msg.textContent = messages.success.text;
      cleanMsgClasses();
      msg.classList.add(messages.success.class);
    }
  } catch (error) {
    console.error(`Fetching error: ${error.message}`);
  }
});
