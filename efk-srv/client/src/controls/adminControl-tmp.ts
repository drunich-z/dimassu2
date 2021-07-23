import Model from '../model';
import Store from '../shared/store';
import View from '../view';

const SRV_STRING_ADD_CARD = 'http://localhost:3000/api/cards';

const ReadImageFile = async (file: File) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
});

const onPicturePreload = async (e: Event) => {
  const preview = document.getElementById('preview') as HTMLElement;
  const target = e.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];
  const loadedImage = await ReadImageFile(file);
  preview.setAttribute('src', loadedImage as string);
};

// function handlePictureSelect(evt: Event, preview: HTMLElement) {
//   const file = (evt.target as HTMLInputElement).files; // FileList object
//   let f;
//   if (file) [f] = file;
//   if (!f) return; // lint

//   if (!f.type.match('image.*')) {
//     console.log('Image only please....');
//     return;
//   }

//   const reader = new FileReader();
//   // Closure to capture the file information.
//   reader.onload = (function(theFile) {
//     return function(e:) {
//       // Render thumbnail.
//       preview.innerHTML = `<img class="picture-preview" title="${theFile.name}" src="${e.target.result}"/>`;

//     };
//   })(f);
//   // Read in the image file as a data URL.
//   reader.readAsDataURL(f);
// }

export default {
  formCard: document.getElementById('form-card') as HTMLFormElement,
  formCardSubmit: document.getElementById('form-card-submit') as HTMLElement,
  formCardInputPicture: document.getElementById('input-picture') as HTMLElement,
  formCardInputSound: document.getElementById('input-sound') as HTMLElement,
  formCardPreview: document.getElementById('preview') as HTMLElement,

  async initAdminControls(): Promise<void> {
    this.formCard = document.getElementById('form-card') as HTMLFormElement;
    this.formCardSubmit = document.getElementById('form-card-submit') as HTMLElement;
    this.formCardInputPicture = document.getElementById('input-picture') as HTMLElement;
    this.formCardInputSound = document.getElementById('input-sound') as HTMLElement;
    this.formCardPreview = document.getElementById('preview') as HTMLElement;

    this.formCardInputPicture.addEventListener('change', onPicturePreload);
    this.formCard.onsubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(this.formCard);
      formData.append('categoryId', '7');

      const response = await fetch(SRV_STRING_ADD_CARD, {
        method: 'POST',
        body: formData,
      });

      // const result = await response.json();
    };
  },

};
