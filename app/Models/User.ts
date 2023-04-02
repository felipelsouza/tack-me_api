import AppBaseModel from './AppBaseModel';
import { DateTime } from 'luxon';
import { column } from '@ioc:Adonis/Lucid/Orm';

export default class User extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public externalId: string;

  @column()
  public externalSource: string;

  @column()
  public email: string;

  @column()
  public name: string;

  @column({ serializeAs: null })
  public isDeleted: boolean = false;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
