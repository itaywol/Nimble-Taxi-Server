/**
 * driver data transfer object for requests transforming
 */
export class DriverDataDTO {
  readonly phoneNumber: String;
  readonly currentLongtitude: number;
  readonly currentLatitude: number;
  readonly busy: Boolean;
}
