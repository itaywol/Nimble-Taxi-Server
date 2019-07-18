/**
 * data transfer object for creating a taxi request
 */
export class CreateRequestDTO {
  readonly phoneNumber: String;
  readonly pickUpLocation: String;
  readonly desiredLocation: String;
  readonly fullName: String;
}
