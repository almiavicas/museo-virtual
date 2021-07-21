export class Artifact {
  /**
   * Artifact Constructor.
   * @param id - The identified of the Artifact.
   * @param labelArtifact - Title or label of the Artifact.
   * @param labelMaterial - Material used to build the artifact.
   * @param labelCreator - Author of the artifact.
   * @param labelLocation - The room in the Museum where it is stored.
   * @param note - A description or history about the artifact.
   */
  constructor(
    public id: string,
    //public artifactLabel: any,
    public labelArtifact: any,
    public labelMaterial: string,
    public labelCreator: string,
    public labelLocation: string,
    public note: any,
  ) { }
}
