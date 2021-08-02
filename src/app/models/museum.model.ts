import { Identifiers } from "@angular/compiler";

export class MuseumOverview {
  /**
   * Constructor of MuseumOverview.
   * @param label - The museum title.
   * @param museum - The museum URL to extract all the data from.
   * @param museum_siteCH
   * @param description - the museum description
   * @param id - the museum id
   * @param location - the museum location
   * @param rooms - The rooms of the Museum.
   */
  constructor(
    public label: string,
    public museum: string,
    public museum_siteCH: string,
    public description: string,
    public id: string,
    public location: string,
    public rooms: string[],
  ) { }
}
