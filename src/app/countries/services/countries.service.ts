import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    public cacheStore: CacheStore = {
      byCapital: { term: '', countries: [] },
      byCountry: { term: '', countries: [] },
      byRegion: { region: '', countries: [] }
    }

    constructor(private http: HttpClient) {
        this.loadFromLocalStorage();
     }

    private saveToLocalStorage() {
        localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ));
    }

    private loadFromLocalStorage(){
       if( !localStorage.getItem('cacheStore') ) return;

       this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! )

    }

    private getCountriesHttpRequest( url: string ): Observable<Country[]> {
      // Con el get no es necesario cancelar la suscripción , lo hace de forma automática
        return this.http.get<Country[]>( url )
          .pipe(
                catchError( () => of([]) ),          
         );
    }

    searchCapital( term: string ): Observable<Country []>{

      //Estudiar operadores e RXJS
      const url = `${ this.apiUrl}/capital/${ term }`;
      return this.getCountriesHttpRequest( url )
              .pipe(
                tap( countries => this.cacheStore.byCapital = { term, countries }),
                tap( () => this.saveToLocalStorage() )
              );

    }

    searchCountry( term: string ): Observable<Country []>{

      //Estudiar operadores e RXJS
      const url = `${ this.apiUrl}/name/${ term }`;
      return this.getCountriesHttpRequest( url )
            .pipe(
                tap( countries => this.cacheStore.byCountry = { term, countries }),
                tap( () => this.saveToLocalStorage() )
               );
    }

    searchRegion( region: Region ): Observable<Country []>{

      //Estudiar operadores e RXJS
      const url = `${ this.apiUrl}/region/${ region }`;
      return this.getCountriesHttpRequest( url )
            .pipe(
                  tap( countries => this.cacheStore.byRegion = { region, countries }),
                  tap( () => this.saveToLocalStorage() )
                );
    }

    searchCountryByAlphaCode( code:string ): Observable<Country | null >{

        const url = `${ this.apiUrl}/alpha/${ code }`;
        return this.http.get<Country[]>( url )
            .pipe(
               map ( countries => countries.length >0 ? countries[0]: null ), 
               catchError( () =>  of( null ) )  
            );
    }
    
}