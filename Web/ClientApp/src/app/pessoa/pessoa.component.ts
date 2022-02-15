import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html'
})
export class PessoaComponent {
  public persons: Person[];
  public currentId: string;
  public registerForm: FormGroup;
  public submitted = false;

  public getData: Function;
  public openModal: Function;
  public closeModal: Function;
  public savePerson: Function;
  public deletePerson: Function;
  public setPersonToEdit: Function;

  public isEdit: boolean;

  constructor(http: HttpClient, @Inject('WEB_API_URL') webApiUrl: string, private formBuilder: FormBuilder) {
    this.getData = function (): void {
      http.get<Person[]>(webApiUrl + "pessoa").subscribe(result => {
        this.persons = result;
      }, error => console.error(error));
    }

    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      birthday: ['', [Validators.required]],
      income: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.pattern(/[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/g)]]
    })

    this.getData();

    this.isEdit = false;

    this.openModal = function (id: string, edit: boolean, currentValue: Person): void {
      const modal = document.getElementById(id);
      modal.setAttribute("class", "modal fade in");
      modal.style.display = "block";
      modal.style.opacity = "100";

      if (edit) this.isEdit = edit;
      if (currentValue) {
        this.registerForm.get("fullName").setValue(currentValue.fullName);
        this.registerForm.get("birthday").setValue(currentValue.birthday.toString().split('T')[0]);
        this.registerForm.get("income").setValue(currentValue.income);
        this.registerForm.get("cpf").setValue(currentValue.cpf);
        this.currentId = currentValue.id;
      }
    };

    this.closeModal = function (id: string): void {
      const modal = document.getElementById(id);
      modal.setAttribute("class", "modal fade");
      modal.style.display = "";
      modal.style.opacity = "0";

      this.submitted = false;
      this.registerForm.reset();

      if (this.isEdit) this.isEdit = false;
    };

    this.savePerson = function (): void {
      this.submitted = true;

      if (!this.isEdit && this.registerForm.valid) {
        http.post<Person>(webApiUrl + "pessoa", this.registerForm.value as Person, {})
          .subscribe(result => {
            this.getData();
          });

        this.closeModal("editModal");
      }

      else if (this.registerForm.valid) {
        this.registerForm.value.id = this.currentId;

        http.put<Person>(webApiUrl + "pessoa", this.registerForm.value as Person, {})
          .subscribe(result => {
            this.getData();
          });

        this.closeModal("editModal");
      }
    }

    this.deletePerson = function (): void {
      http.delete(webApiUrl + "pessoa?id=" + this.currentId, {})
        .subscribe(result => {
          this.getData();
        });

      this.closeModal("deleteModal");
    }
  }
}

interface Person {
  id: number;
  fullName: string;
  birthday: Date;
  income: number;
  cpf: string;
}
