import './style.css';

// select elements from DOM
const form = document.getElementById('form') as HTMLFormElement;
const list = document.getElementById('list');

// types
type UserList = {
  tel: string;
  name: string;
  Lname: string;
  email: string;
  id: string;
};

// global variables
let userList: UserList[] = [];
let isEditing = false;
let editedUserId = '';
// event listeners
form?.addEventListener('submit', event => {
  event.preventDefault();

  const formElement = event.target as HTMLFormElement;
  const name = formElement.elements.namedItem('name') as HTMLInputElement;
  const Lname = formElement.elements.namedItem('Lname') as HTMLInputElement;
  const email = formElement.elements.namedItem('email') as HTMLInputElement;
  const tel = formElement.elements.namedItem('tel') as HTMLInputElement;
  const submitButton = formElement.elements.namedItem(
    'submit'
  ) as HTMLButtonElement;

  if (!isEditing) {
    userList.push({
      tel: tel.value,
      name: name.value,
      Lname: Lname.value,
      email: email.value,
      id: crypto.randomUUID(),
    });
  } else {
    userList.map(user => {
      if (user.id === editedUserId) {
        user.tel = tel.value;
        user.name = name.value;
        user.Lname = Lname.value;
        user.email = email.value;
      }
      return user;
    });
    isEditing = false;
    submitButton.textContent = 'عضویت';
  }

  form.reset();
  console.log(userList);
  renderUserList(userList);
});

list?.addEventListener('click', e => {
  const target = e.target as HTMLElement;

  if (target.nodeName === 'BUTTON' && target.dataset.label === 'delete') {
    handleDelete(target.id);
  }
  if (target.nodeName === 'BUTTON' && target.dataset.label === 'edit') {
    handleEdit(target.id);
  }
});

const renderUserList = (userList: UserList[]): void => {
  if (list) {
    list.innerHTML = '';
  }
  userList.map(user =>
    list?.insertAdjacentHTML(
      'beforeend',
      `<li class="">
        <span class="">${user.tel}</span>
        <div>
          <h5 class="mb-1">${user.name} ${user.Lname}</h5>
          <p class="mb-0">${user.email}
          </p>
          <button class="" id="${user.id}" data-label="delete" >Delete</button>
          <button class="" id="${user.id}" data-label="edit">Edit</button>
          </div>
          </li>
          `
    )
  );
};

function handleDelete(id: string): void {
  console.log('om');

  userList = userList.filter(user => user.id !== id);
  renderUserList(userList);
}

function handleEdit(id: string): void {
  const user = userList.find(user => user.id === id);
  console.log(user);
  isEditing = true;
  editedUserId = id;
  const [name, Lname, email, tel] = Array.from(form.children).map(el =>
    el.childNodes.item(3)
  ) as any;
  name.value = user?.name;
  Lname.value = user?.Lname;
  email.value = user?.email;
  tel.value = user?.tel;
  form.querySelector('#submit-btn')!.textContent = 'ویرایش';
}
