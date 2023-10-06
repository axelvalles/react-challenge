import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoForm from "./todo-form.component";
import { store } from "../../store";
import { Provider } from "react-redux";

describe("TodoForm component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <TodoForm />
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("should add two number", () => {
    expect(1 + 1).toBe(2);
  });

  test("should be render form", () => {
    expect(screen.getByRole("form")).toBeDefined();
  });

  test("should be render 1 input", () => {
    expect(screen.getAllByRole("textbox").length).toBe(1);
  });

  test("should be displayed form errors on input is empty", async () => {
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(screen.queryAllByRole("alert").length).toBeGreaterThan(0);
  });
});

export {};
