import { BoxArrowRight } from "react-bootstrap-icons";
import { Button } from "../button/Button";
import "./header.scss";
import React from "react";
import { UserInfoProps } from "./_types";
import Skeleton from "../skeleton/Skeleton";

export const UserInfo = ({
  showLogin,
  user,
  isLoading,
  onLogin,
}: UserInfoProps) => {
  if (isLoading) return <Skeleton />;
  return (
    <div className="user-info">
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
        <Button size="medium" type="link" onClick={onLogin}>
          login
        </Button>
      ) : null}
    </div>
  );
};
