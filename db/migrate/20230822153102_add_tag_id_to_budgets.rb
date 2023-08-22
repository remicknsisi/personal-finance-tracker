class AddTagIdToBudgets < ActiveRecord::Migration[6.1]
  def change
    add_column :budgets, :tag_id, :integer
  end
end
