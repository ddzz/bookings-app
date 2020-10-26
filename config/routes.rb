Rails.application.routes.draw do
  match '/bookings' => "bookings#options", via: :options
  resources :bookings
end
