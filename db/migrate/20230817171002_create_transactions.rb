class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.date :date
      t.float :amount
      t.text :description
      t.string :payment_method
      t.timestamps
    end
  end
end
