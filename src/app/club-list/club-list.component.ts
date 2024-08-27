import { Component, OnInit } from '@angular/core';
import { Club } from '../interfaces/club';
import { ClubService } from '../services/club.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrl: './club-list.component.css'
})
export class ClubListComponent implements OnInit {

  clubs: Club[] = [];
  filteredClubs: Club[] = [];
  noResults: boolean = false;
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor(
    private clubService: ClubService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
      this.clubService.getClubs().subscribe((data) =>{
        this.clubs = data;
        this.sortClubsAZ()
        this.filteredClubs = [...this.clubs];
        this.noResults = false;  
      });
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
  }
  
}
