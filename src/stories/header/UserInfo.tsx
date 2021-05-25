import { BoxArrowRight } from "react-bootstrap-icons";
import { Button } from "../button/Button";
import "./header.scss";
import React from "react";
import { UserInfoProps } from "./_types";

export const UserInfo = ({ showLogin, user, isLoading }: UserInfoProps) => {
  let className = "user-info";
  if (isLoading) className += " loading";
  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div className={className}>
          {user ? (
            <>
              <div className="user-avatar">
                <img alt={user.name + " " + user.surname} src={user.image} />
              </div>
              <div className="user-name">
                {user.name} {user.surname}{" "}
                <span className="user-id">(T{user.id})</span>
              </div>
              <Button size="sm" type="link">
                <BoxArrowRight />
              </Button>
            </>
          ) : showLogin ? (
            <Button size="medium" type="link">
              login
            </Button>
          ) : null}
        </div>
      )}
    </>
  );
};
