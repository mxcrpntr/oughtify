class UpdateUsersAgain < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :birth_date, 'date USING CAST(birth_date AS date)'
  end
end
