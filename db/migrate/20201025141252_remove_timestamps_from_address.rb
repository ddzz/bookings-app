class RemoveTimestampsFromAddress < ActiveRecord::Migration[6.0]
  def change
    remove_column :addresses, :created_at, :string
    remove_column :addresses, :updated_at, :string
  end
end
