class AddUserIdToTransactons < ActiveRecord::Migration[6.1]
  def change
    add_column :transactions, :user_id, :integer
  end
end
