
export default class UserInfo  {

  constructor(name,job,avatar) {
    this._nameElem = name;
    this._jobElem = job;
    this._avatarElem = avatar;
    this._job ="";
    this._name = "";
    this._avatar = "";
  }

  setUserInfo = (newName,newJob,newAvatar) => {
    this._name = newName;
    this._job = newJob;
    this._avatar = newAvatar;
    this._nameElem.textContent = this._name;
    this._jobElem.textContent = this._job;
    this._avatarElem.src = this._avatar;
  }

  getUserInfo = () => {

    return {
      // name: this._name,
      // job: this._job
      name: this._nameElem.textContent ,
      job: this._jobElem.textContent,
      avatar: this._avatar.src

    }
  }
}
