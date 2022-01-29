import createError, { BadRequest } from 'http-errors'
import { validate, ValidationError } from 'class-validator'

export class BaseDto {
  async isValid(): Promise<boolean> {
    const errors = await validate(this)

    if (errors.length > 0) {
      const badRequest = new createError.BadRequest()

      throw new BadRequest(
        JSON.stringify({
          name: badRequest.name,
          description: errors.map((e: ValidationError) => ({
            property: e.property,
            constraints: this.getConstraints(e),
          })),
        }),
      )
    }

    return true
  }

  private getConstraints(error: ValidationError): string[] {
    if (error?.children?.length) {
      return this.getConstraints(error.children[0])
    }

    return Object.values(error.constraints ?? {})
  }
}
