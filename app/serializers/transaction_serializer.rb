class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :date, :amount, :description, :payment_method, :tag_id

  belongs_to :tag
  belongs_to :user
end
