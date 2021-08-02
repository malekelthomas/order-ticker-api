package domain

import "time"

type Order struct {
	customer     Customer
	items        []OrderItem
	created_at   time.Time
	started_at   time.Time
	completed_at time.Time
	done         bool
	time_taken   int64
}

type Customer struct {
	first_name string
	last_name  string
	email      string
}

type OrderItem struct {
	name     string
	quantity int64
}
