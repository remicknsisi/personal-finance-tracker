class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :date, :amount, :description, :payment_method

  belongs_to :tag
  belongs_to :user
end
