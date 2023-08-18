class AddTagIdToTransactions < ActiveRecord::Migration[6.1]
  def change
    add_column :transactions, :tag_id, :integer
  end
end
