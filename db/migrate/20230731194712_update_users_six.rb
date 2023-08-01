class UpdateUsersSix < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :user_queue, :queue
  end
end
