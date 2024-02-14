import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { TreeError } from '@angular/compiler';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    constructor(private http: HttpClient) { }

    searchCapital( term: string ): Observable<Country []>{

      //Estudiar operadores e RXJS
      const url = `${ this.apiUrl}/capital/${ term }`;
      return this.http.get<Country[]>( url )
            .pipe(
               catchError( () => {
                   return  of([]);              
               })  
            );
    }

    searchCountry( term: string ): Observable<Country []>{

      //Estudiar operadores e RXJS
      const url = `${ this.apiUrl}/name/${ term }`;
      return this.http.get<Country[]>( url )
            .pipe(
               catchError( () => {
                   return  of([]);              
               })  
            );
    }

    searchRegion( term: string ): Observable<Country []>{

      //Estudiar operadores e RXJS
      const url = `${ this.apiUrl}/region/${ term }`;
      return this.http.get<Country[]>( url )
            .pipe(
               catchError( () => {
                   return  of([]);              
               })  
            );
    }
    
    
}