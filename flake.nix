{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    workerd = {
      url = "github:getchoo/workerd-docker";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { nixpkgs, flake-utils, ... } @ inputs:
    flake-utils.lib.eachSystem (flake-utils.lib.defaultSystems) (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
        workerd = inputs.workerd.packages.${system}.workerd;
      in {
        # `nix develop`
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs
            nodePackages.wrangler
          ];
          MINIFLARE_WORKERD_PATH="${workerd}/bin/workerd";
        };
      }
    );
}
