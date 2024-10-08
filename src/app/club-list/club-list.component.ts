import { Component, OnInit, ViewChild } from '@angular/core';
import { ClubService } from '../services/club.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Club } from '../interfaces/club';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']  
})
export class ClubListComponent implements OnInit {

  clubs: Club[] = [];
  filteredClubs: Club[] = [];
  pagedClubs: Club[] = [];  
  noResults: boolean = false;
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  pageSize: number = 30;  // Tamaño de página por defecto
  currentPage: number = 0;  // Página actual

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clubService: ClubService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getClubs();
  }

  getClubs() {
    this.clubService.getClubs().subscribe((data) =>{
      this.clubs = data;
      this.sortClubsAZ();
      this.filteredClubs = [...this.clubs];
      this.updatePagedClubs();  
      this.noResults = false;  
    });
  }

  getNT() {
    this.clubService.getNT().subscribe((data) =>{
      this.clubs = data;
      this.sortClubsAZ();
      this.filteredClubs = [...this.clubs];
      this.updatePagedClubs();  
      this.noResults = false;  
    });
  }

  toggleTeams(isChecked: boolean) {
    this.currentPage = 0;
    if (this.paginator) {
      this.paginator.firstPage(); 
    }
    if (isChecked) {
      this.getNT();
    } else {
      this.getClubs();
    }
  }

  openClubDetailModal(club: Club): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: club,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredClubs = this.clubs.filter(club => 
      club.name?.toLowerCase().includes(searchTerm) ||
      club.city_country?.toLowerCase().includes(searchTerm) ||
      club.description?.toLowerCase().includes(searchTerm)
    );
    this.noResults = this.filteredClubs.length === 0 && searchTerm.length > 0;
    this.currentPage = 0;  
    this.updatePagedClubs();  
  } 

  sortClubsAZ(): void {
    this.clubs.sort((a, b) => {
      const nameA = a.name?.toLowerCase() || '';
      const nameB = b.name?.toLowerCase() || '';
      return nameA.localeCompare(nameB);
    });
  }

  filterByLetter(letter: string): void {
    this.filteredClubs = this.clubs.filter(club => 
      club.name?.toUpperCase().startsWith(letter)
    );
    this.noResults = this.filteredClubs.length === 0;
    this.currentPage = 0;  // Resetea a la primera página después de un filtrado por letra
    this.updatePagedClubs();  // Actualiza los clubes paginados
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedClubs();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updatePagedClubs(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedClubs = this.filteredClubs.slice(startIndex, endIndex);
  }
}
