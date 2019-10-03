package main

import (
	"fmt"
	"time"
)

func main() {
	for {
		fmt.Println("Hello You!")

		time.Sleep(time.Second * 1)
	}
}
