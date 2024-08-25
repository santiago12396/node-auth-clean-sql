import { DataTypes, Model, Sequelize } from 'sequelize';

class User extends Model {

    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public createdAt!: Date;
    public updatedAt!: Date;

  static initModel(sequelize: Sequelize) {

    User.init({
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: { msg: 'Name is required' }
          }
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
              notEmpty: { msg: 'Email is required' },
              isEmail: { msg: 'Email not is valid' }
          }
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: { msg: 'Password is required' }
          }
      }
    }, {
      sequelize,
      modelName: 'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });

  }

  toJSON() {
    const { password, ...values } = super.toJSON();
    return values;
  } 

}

export default User;


