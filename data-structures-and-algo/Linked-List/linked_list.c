#include <stdio.h>
#include <stdlib.h>

struct linked_list {
  char *data;
  struct linked_list *next;
};

struct linked_list *
init (char *data)
{
  struct linked_list *head;
  head = (struct linked_list*)malloc(sizeof(*head));
  head->data = data;
  head->next = NULL;
  return head;
}

void
print_list (struct linked_list *ll)
{
  printf("[");
  while (ll->next != NULL) {
    printf("%s, ",ll->data);
    ll = ll->next;
  }
  printf("%s]\n", ll->data);
}

int
push (struct linked_list *head, char *data)
{
  struct linked_list *ll = (struct linked_list*)malloc(sizeof(*ll));
  if (ll == NULL) return 0;
  while (head->next != NULL) {
    head = head->next;
  }
  head->next = ll;
  ll->data = data;
  ll->next = NULL;
  return 1;
}

char *
delete_by_index (struct linked_list **head, int index)
{
  struct linked_list *current = *head;
  struct linked_list *previous = NULL;

  while (index) {
    if (current->next == NULL) {
      previous->next = NULL;
      break;
    }
    previous = current;
    current = current->next;
    index--;
  }
  if (*head == current) {
    *head = current->next;
  } else {
    previous->next = current->next;
  }
  return current->data;
}

void reverse (struct linked_list **head)
{
  struct linked_list *prev = NULL;
  struct linked_list *current = *head;
  struct linked_list *next;

  while (current != NULL) {
    next = current->next;
    current->next = prev;
    prev = current;
    current = next;
  }
  *head = prev;
}

int main ()
{
  struct linked_list *HEAD;
  HEAD = init("Hello");
  push(HEAD, "World");
  push(HEAD, "Jason");
  push(HEAD, "Liao");
  print_list(HEAD);
  delete_by_index(&HEAD, 0);
  print_list(HEAD);
  reverse(&HEAD);
  print_list(HEAD);
}
