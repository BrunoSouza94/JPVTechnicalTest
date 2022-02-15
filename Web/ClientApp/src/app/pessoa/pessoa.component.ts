import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html'
})
export class PessoaComponent {
  public persons: Person[];
  public currentPerson: Person;

  public getData: Function;
  public openModal: Function;
  public closeModal: Function;
  public savePerson: Function;
  public deletePerson: Function;
  public setPersonToEdit: Function;

  public isEdit: boolean;

  constructor(http: HttpClient, @Inject('WEB_API_URL') webApiUrl: string) {
    this.getData = function (): void {
      http.get<Person[]>(webApiUrl + "pessoa").subscribe(result => {
        this.persons = result;
      }, error => console.error(error));
    }

    this.getData();

    this.currentPerson = { id: 0, fullName: "", birthday: null, income: null, cpf: ""};
    this.isEdit = false;

    this.openModal = function (id: string, edit: boolean, currentValue: Person): void {
      const modal = document.getElementById(id);
      modal.setAttribute("class", "modal fade in");
      modal.style.display = "block";
      modal.style.opacity = "100";

      if (edit) this.isEdit = edit;
      if (currentValue) this.currentPerson = currentValue;
    };

    this.closeModal = function (id: string): void {
      const modal = document.getElementById(id);
      modal.setAttribute("class", "modal fade");
      modal.style.display = "";
      modal.style.opacity = "0";

      if (this.isEdit) this.isEdit = false;
      this.currentPerson = { id: 0, fullName: "", birthday: null, income: null, cpf: "" };
    };

    this.savePerson = function (): void {
      if (!this.isEdit)
        http.post<Person>(webApiUrl + "pessoa", this.currentPerson, {})
          .subscribe(result => {
            this.getData();
          });
        
      else
        http.put<Person>(webApiUrl + "pessoa", this.currentPerson, {})
          .subscribe(result => {
            this.getData();
          });

      this.closeModal("editModal");
    }

    this.deletePerson = function (): void {
      http.delete(webApiUrl + "pessoa?id=" + this.currentPerson.id, {})
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
